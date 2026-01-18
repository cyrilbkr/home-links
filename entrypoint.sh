#!/bin/sh
set -e

CONFIG_FILE="/app/dist/config.json"

# Check if any HOME_ environment variables are set
if env | grep -q "^HOME_"; then
  echo "🔧 Generating config from environment variables..."
  
  # Build sections array from HOME_SECTION_* variables
  SECTIONS="["
  FIRST=true
  
  i=1
  while true; do
    SECTION_VAR="HOME_SECTION_$i"
    SECTION_VALUE=$(eval echo \$$SECTION_VAR)
    
    if [ -z "$SECTION_VALUE" ]; then
      break
    fi
    
    if [ "$FIRST" = true ]; then
      FIRST=false
    else
      SECTIONS="$SECTIONS,"
    fi
    
    SECTIONS="$SECTIONS$SECTION_VALUE"
    i=$((i + 1))
  done
  
  SECTIONS="$SECTIONS]"
  
  # If no individual sections, use HOME_SECTIONS if provided
  if [ "$SECTIONS" = "[]" ] && [ -n "$HOME_SECTIONS" ]; then
    SECTIONS="$HOME_SECTIONS"
  fi
  
  # Generate config file
  cat > "$CONFIG_FILE" << EOF
{
  "title": "${HOME_TITLE:-Home Links}",
  "subtitle": "${HOME_SUBTITLE:-Your personalized home page}",
  "footer": "${HOME_FOOTER:-© 2026 Home Links}",
  "sections": $SECTIONS
}
EOF
  
  echo "✅ Config generated successfully"
else
  echo "📄 Using default config.json"
fi

# Start the server
exec node server.js
