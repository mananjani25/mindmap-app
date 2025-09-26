#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
OUTPUT_FILE="all_code.txt"
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')

# File extensions to include
EXTENSIONS=(
    "*.js" "*.jsx" "*.ts" "*.tsx" 
    "*.css" "*.scss" "*.sass" "*.less"
    "*.json" "*.md" "*.html" "*.htm"
    "*.yml" "*.yaml" "*.toml"
    "*.py" "*.go" "*.rs" "*.c" "*.cpp" "*.h"
    "*.java" "*.php" "*.rb" "*.sh"
    "*.vue" "*.svelte" "*.astro"
    "*.sql" "*.graphql" "*.gql"
    "*.env.example" "*.gitignore" "*.dockerignore"
    "Dockerfile*" "*.dockerfile"
)

# Directories to exclude
EXCLUDE_DIRS=(
    "node_modules" ".next" "build" "dist" ".git" 
    "coverage" ".nyc_output" ".cache" ".parcel-cache"
    "target" "vendor" "__pycache__" ".pytest_cache"
    ".vscode" ".idea" "*.egg-info" ".DS_Store"
)

# Files to exclude
EXCLUDE_FILES=(
    "package-lock.json" "yarn.lock" "pnpm-lock.yaml"
    "Cargo.lock" "composer.lock" "Pipfile.lock"
    "*.min.js" "*.min.css" "*.bundle.js" "*.bundle.css"
    "*.log" "*.tmp" "*.temp" "*.swp" "*.swo"
)

echo -e "${BLUE}🚀 Code Extraction Tool${NC}"
echo -e "${YELLOW}Starting extraction at: $TIMESTAMP${NC}"
echo ""

# Check if tree command exists
if command -v tree &> /dev/null; then
    HAS_TREE=true
    echo -e "${GREEN}✓ tree command found${NC}"
else
    HAS_TREE=false
    echo -e "${YELLOW}⚠ tree command not found, using alternative structure view${NC}"
fi

# Clear the output file and add header
cat > "$OUTPUT_FILE" << EOF
PROJECT CODE EXTRACTION
=======================
Generated: $TIMESTAMP
Directory: $(pwd)
=======================

EOF

# Add project structure
echo -e "${BLUE}📁 Generating project structure...${NC}"
echo "=== PROJECT STRUCTURE ===" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"

if [ "$HAS_TREE" = true ]; then
    # Use tree with exclude patterns
    TREE_IGNORE=$(IFS='|'; echo "${EXCLUDE_DIRS[*]}")
    tree -I "$TREE_IGNORE" >> "$OUTPUT_FILE" 2>/dev/null
else
    # Alternative structure using find
    echo "Project Structure (using find):" >> "$OUTPUT_FILE"
    echo "" >> "$OUTPUT_FILE"
    
    # Build exclude pattern for find
    FIND_EXCLUDE=""
    for dir in "${EXCLUDE_DIRS[@]}"; do
        FIND_EXCLUDE="$FIND_EXCLUDE -not -path \"./$dir/*\""
    done
    
    eval "find . -type d $FIND_EXCLUDE" | sort | head -50 >> "$OUTPUT_FILE"
fi

echo "" >> "$OUTPUT_FILE"
echo "=== SOURCE CODE FILES ===" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"

# Build find command for file extensions
EXTENSION_PATTERN=""
for i in "${!EXTENSIONS[@]}"; do
    ext="${EXTENSIONS[$i]}"
    if [ $i -eq 0 ]; then
        EXTENSION_PATTERN="-name \"$ext\""
    else
        EXTENSION_PATTERN="$EXTENSION_PATTERN -o -name \"$ext\""
    fi
done

# Build exclude directory pattern
DIR_EXCLUDE=""
for dir in "${EXCLUDE_DIRS[@]}"; do
    DIR_EXCLUDE="$DIR_EXCLUDE -not -path \"./$dir/*\""
done

# Build exclude file pattern
FILE_EXCLUDE=""
for file in "${EXCLUDE_FILES[@]}"; do
    FILE_EXCLUDE="$FILE_EXCLUDE -not -name \"$file\""
done

# Find and process files
echo -e "${BLUE}📝 Extracting source files...${NC}"
file_count=0

eval "find . -type f \( $EXTENSION_PATTERN \) $DIR_EXCLUDE $FILE_EXCLUDE" | sort | while read -r file; do
    # Skip if file is too large (>1MB)
    if [ $(stat -f%z "$file" 2>/dev/null || stat -c%s "$file" 2>/dev/null || echo 0) -gt 1048576 ]; then
        echo -e "${YELLOW}⚠ Skipping large file: $file${NC}"
        continue
    fi
    
    echo -e "${GREEN}Processing: $file${NC}"
    
    {
        echo ""
        echo "=== $file ==="
        echo ""
        
        # Check if file is binary
        if file "$file" | grep -q "text\|empty"; then
            cat "$file"
        else
            echo "[Binary file - content not displayed]"
        fi
        
        echo ""
        echo ""
    } >> "$OUTPUT_FILE"
    
    ((file_count++))
done

# Add summary
{
    echo ""
    echo "=== EXTRACTION SUMMARY ==="
    echo ""
    echo "Extraction completed at: $(date '+%Y-%m-%d %H:%M:%S')"
    echo "Total files processed: $file_count"
    echo "Output file: $OUTPUT_FILE"
    echo "Output size: $(du -h "$OUTPUT_FILE" | cut -f1)"
} >> "$OUTPUT_FILE"

echo ""
echo -e "${GREEN}✅ Extraction completed!${NC}"
echo -e "${BLUE}📄 Output file: $OUTPUT_FILE${NC}"
echo -e "${BLUE}📊 File size: $(du -h "$OUTPUT_FILE" | cut -f1)${NC}"

# Optional: Open file if on macOS/Linux with GUI
if [[ "$OSTYPE" == "darwin"* ]]; then
    read -p "Open file in default editor? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        open "$OUTPUT_FILE"
    fi
elif [[ -n "$DISPLAY" ]]; then
    read -p "Open file in default editor? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        xdg-open "$OUTPUT_FILE" 2>/dev/null || echo "Could not open file automatically"
    fi
fi