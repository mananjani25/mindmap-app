-- Disables function body checking for compatibility.
SET check_function_bodies = false;

-- =================================================================
-- ========= SECTION 1: ENUMS, FUNCTIONS, AND CORE TABLES ==========
-- =================================================================

-- ENUM Type Definitions for various table statuses.
CREATE TYPE public.document_status AS ENUM (
    'uploaded',
    'processing',
    'completed',
    'failed'
);

CREATE TYPE public.test_status AS ENUM (
    'DRAFT',
    'PUBLISHED',
    'ARCHIVED'
);

-- Helper function to automatically update the 'updated_at' timestamp on row updates.
CREATE FUNCTION public.set_current_timestamp_updated_at() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$;


-- Table for storing user documents.
CREATE TABLE public.documents (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    title character varying(255) NOT NULL,
    file_name character varying(255) NOT NULL,
    file_path character varying(500) NOT NULL,
    file_size integer NOT NULL,
    mime_type character varying(100) NOT NULL,
    uploaded_by uuid NOT NULL,
    processed boolean DEFAULT false,
    status public.document_status DEFAULT 'uploaded'::public.document_status,
    raw_text text,
    processed_chunks jsonb,
    metadata jsonb,
    entities jsonb,
    key_phrases jsonb,
    sections jsonb,
    word_count integer DEFAULT 0,
    sentence_count integer DEFAULT 0,
    processing_time integer,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);

-- Table for mind maps generated from documents.
CREATE TABLE public.mindmaps (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    document_id uuid NOT NULL,
    title character varying(255) NOT NULL,
    structure jsonb NOT NULL,
    created_by uuid NOT NULL,
    is_public boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);

-- Table for tests or quizzes.
CREATE TABLE public.tests (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    title character varying(255) NOT NULL,
    description text,
    instructor_id uuid NOT NULL,
    status public.test_status DEFAULT 'DRAFT'::public.test_status,
    time_limit integer,
    max_attempts integer DEFAULT 1,
    passing_score integer,
    instructions text,
    is_randomized boolean DEFAULT false,
    show_results boolean DEFAULT true,
    allow_review boolean DEFAULT true,
    start_date timestamp with time zone,
    end_date timestamp with time zone,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);

-- Table for questions within a test.
CREATE TABLE public.questions (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    test_id uuid NOT NULL,
    question_text text NOT NULL,
    question_type character varying(50) NOT NULL,
    points integer DEFAULT 1,
    order_index integer NOT NULL,
    explanation text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);

-- Table for the options available for a question.
CREATE TABLE public.question_options (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    question_id uuid NOT NULL,
    option_text text NOT NULL,
    is_correct boolean DEFAULT false,
    order_index integer NOT NULL,
    created_at timestamp with time zone DEFAULT now()
);

-- Table for tracking student attempts at tests.
CREATE TABLE public.test_attempts (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    test_id uuid NOT NULL,
    student_id uuid NOT NULL,
    started_at timestamp with time zone DEFAULT now(),
    submitted_at timestamp with time zone,
    time_taken integer,
    score integer,
    total_questions integer NOT NULL,
    correct_answers integer DEFAULT 0,
    is_completed boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);

-- Table for storing student responses to each question in an attempt.
CREATE TABLE public.test_responses (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    attempt_id uuid NOT NULL,
    question_id uuid NOT NULL,
    selected_option_ids jsonb NOT NULL,
    is_correct boolean DEFAULT false,
    points_earned integer DEFAULT 0,
    time_spent integer,
    created_at timestamp with time zone DEFAULT now()
);

-- ===================================================================
-- ========= SECTION 2: NEW ROLE-BASED ACCESS CONTROL (RBAC) =========
-- ===================================================================

-- Create a new schema to encapsulate all RBAC-related tables.
CREATE SCHEMA rbac;

-- Defines user roles (e.g., ADMIN, INSTRUCTOR).
CREATE TABLE rbac.rolemaster (
    role_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    role_name VARCHAR(255) NOT NULL UNIQUE,
    role_description TEXT,
    is_deleted BOOLEAN DEFAULT false NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Defines specific permissions (e.g., CREATE, READ, DELETE).
CREATE TABLE rbac.permissionmaster (
    permission_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    permission_name VARCHAR(255) NOT NULL UNIQUE,
    permission_description TEXT,
    is_deleted BOOLEAN DEFAULT false NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Defines application menu items and their hierarchy.
CREATE TABLE rbac.menumaster (
    menu_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    menu_name VARCHAR(255) NOT NULL,
    menu_url VARCHAR(500),
    parent_menu_id UUID,
    is_deleted BOOLEAN DEFAULT false NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    CONSTRAINT fk_parent_menu FOREIGN KEY (parent_menu_id) REFERENCES rbac.menumaster(menu_id) ON DELETE SET NULL
);

-- Maps roles to specific permissions on certain menus.
CREATE TABLE rbac.role_menu_permission_mapping (
    role_menu_perm_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    role_id UUID NOT NULL,
    menu_id UUID NOT NULL,
    permission_id UUID NOT NULL,
    is_deleted BOOLEAN DEFAULT false NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES rbac.rolemaster(role_id) ON DELETE CASCADE,
    CONSTRAINT fk_menu FOREIGN KEY (menu_id) REFERENCES rbac.menumaster(menu_id) ON DELETE CASCADE,
    CONSTRAINT fk_permission FOREIGN KEY (permission_id) REFERENCES rbac.permissionmaster(permission_id) ON DELETE CASCADE,
    UNIQUE (role_id, menu_id, permission_id)
);

-- ===================================================================
-- ========= SECTION 3: UPDATED USERS TABLE (USERMASTER) =============
-- ===================================================================

-- Updated users table, acting as 'usermaster' from the diagram.
-- The old 'role' ENUM column has been removed and replaced with 'role_id' FK.
CREATE TABLE public.users (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    role_id uuid, -- Foreign key to the new rolemaster table
    username character varying(255) UNIQUE,
    email character varying(255) NOT NULL UNIQUE,
    password_hash character varying(255) NOT NULL,
    first_name character varying(100) NOT NULL,
    last_name character varying(100) NOT NULL,
    mobile_number character varying(50),
    avatar_url character varying(500),
    email_verified boolean DEFAULT false,
    is_active boolean DEFAULT true,
    is_deleted boolean DEFAULT false NOT NULL,
    last_login timestamp with time zone,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


-- ===================================================================
-- ========= SECTION 4: FOREIGN KEYS AND RELATIONSHIPS ===============
-- ===================================================================

-- Foreign Keys for the original public tables
ALTER TABLE ONLY public.documents ADD CONSTRAINT documents_uploaded_by_fkey FOREIGN KEY (uploaded_by) REFERENCES public.users(id) ON DELETE CASCADE;
ALTER TABLE ONLY public.mindmaps ADD CONSTRAINT mindmaps_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.users(id) ON DELETE CASCADE;
ALTER TABLE ONLY public.mindmaps ADD CONSTRAINT mindmaps_document_id_fkey FOREIGN KEY (document_id) REFERENCES public.documents(id) ON DELETE CASCADE;
ALTER TABLE ONLY public.question_options ADD CONSTRAINT question_options_question_id_fkey FOREIGN KEY (question_id) REFERENCES public.questions(id) ON DELETE CASCADE;
ALTER TABLE ONLY public.questions ADD CONSTRAINT questions_test_id_fkey FOREIGN KEY (test_id) REFERENCES public.tests(id) ON DELETE CASCADE;
ALTER TABLE ONLY public.test_attempts ADD CONSTRAINT test_attempts_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.users(id) ON DELETE CASCADE;
ALTER TABLE ONLY public.test_attempts ADD CONSTRAINT test_attempts_test_id_fkey FOREIGN KEY (test_id) REFERENCES public.tests(id) ON DELETE CASCADE;
ALTER TABLE ONLY public.test_responses ADD CONSTRAINT test_responses_attempt_id_fkey FOREIGN KEY (attempt_id) REFERENCES public.test_attempts(id) ON DELETE CASCADE;
ALTER TABLE ONLY public.test_responses ADD CONSTRAINT test_responses_question_id_fkey FOREIGN KEY (question_id) REFERENCES public.questions(id) ON DELETE CASCADE;
ALTER TABLE ONLY public.tests ADD CONSTRAINT tests_instructor_id_fkey FOREIGN KEY (instructor_id) REFERENCES public.users(id) ON DELETE CASCADE;

-- Foreign Key for the updated public.users table to link to RBAC roles
ALTER TABLE public.users ADD CONSTRAINT fk_role_id FOREIGN KEY (role_id) REFERENCES rbac.rolemaster(role_id) ON DELETE SET NULL;


-- ===================================================================
-- ========= SECTION 5: TRIGGERS FOR 'updated_at' TIMESTAMP ==========
-- ===================================================================

-- Triggers for original tables
CREATE TRIGGER set_public_documents_updated_at BEFORE UPDATE ON public.documents FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
CREATE TRIGGER set_public_mindmaps_updated_at BEFORE UPDATE ON public.mindmaps FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
CREATE TRIGGER set_public_questions_updated_at BEFORE UPDATE ON public.questions FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
CREATE TRIGGER set_public_test_attempts_updated_at BEFORE UPDATE ON public.test_attempts FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
CREATE TRIGGER set_public_tests_updated_at BEFORE UPDATE ON public.tests FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
CREATE TRIGGER set_public_users_updated_at BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();

-- Triggers for new RBAC tables
CREATE TRIGGER set_rbac_rolemaster_updated_at BEFORE UPDATE ON rbac.rolemaster FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
CREATE TRIGGER set_rbac_permissionmaster_updated_at BEFORE UPDATE ON rbac.permissionmaster FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
CREATE TRIGGER set_rbac_menumaster_updated_at BEFORE UPDATE ON rbac.menumaster FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
CREATE TRIGGER set_rbac_role_menu_permission_mapping_updated_at BEFORE UPDATE ON rbac.role_menu_permission_mapping FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();