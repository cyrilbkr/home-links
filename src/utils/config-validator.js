/**
 * Validates the structure of a config object
 * @param {Object} config - The config object to validate
 * @returns {{ valid: boolean, errors: string[] }}
 */
export function validateConfig(config) {
  const errors = []

  if (!config || typeof config !== 'object') {
    return { valid: false, errors: ['Config must be an object'] }
  }

  // Validate title
  if (!config.title || typeof config.title !== 'string') {
    errors.push('Config must have a valid title (string)')
  }

  // Validate sections
  if (!Array.isArray(config.sections)) {
    errors.push('Config must have a sections array')
  } else {
    config.sections.forEach((section, index) => {
      if (!section.id || typeof section.id !== 'string') {
        errors.push(`Section ${index} must have a valid id (string)`)
      }
      if (!section.title || typeof section.title !== 'string') {
        errors.push(`Section ${index} must have a valid title (string)`)
      }
      if (!Array.isArray(section.links)) {
        errors.push(`Section ${index} must have a links array`)
      } else {
        section.links.forEach((link, linkIndex) => {
          if (!link.name || typeof link.name !== 'string') {
            errors.push(`Section ${index}, link ${linkIndex} must have a valid name (string)`)
          }
          if (!link.url || typeof link.url !== 'string') {
            errors.push(`Section ${index}, link ${linkIndex} must have a valid url (string)`)
          } else {
            // Validate URL format
            try {
              new URL(link.url)
            } catch (e) {
              errors.push(`Section ${index}, link ${linkIndex} has an invalid URL: ${link.url}`)
            }
          }
        })
      }
    })
  }

  return {
    valid: errors.length === 0,
    errors
  }
}
