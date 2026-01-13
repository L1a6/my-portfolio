interface Skill {
  name: string;
  component: string;
  href: string;
}

type TemplatePart =
  | { type: 'text'; text: string; key: string }
  | { type: 'bold'; text: string; key: string }
  | { type: 'skill'; skill: Skill; key: string };

export function parseTemplate(
  template: string,
  skills: Record<string, Skill>
): TemplatePart[] {
  const parts: TemplatePart[] = [];
  let currentIndex = 0;
  let partKey = 0;

  // Match patterns like {bold:text}, {skillKey}, or plain text
  const regex = /\{bold:(.*?)\}|\{(\w+)\}/g;
  let match;

  while ((match = regex.exec(template)) !== null) {
    // Add text before the match
    if (match.index > currentIndex) {
      parts.push({
        type: 'text',
        text: template.slice(currentIndex, match.index),
        key: `text-${partKey++}`,
      });
    }

    if (match[1]) {
      // Bold text: {bold:something}
      parts.push({
        type: 'bold',
        text: match[1],
        key: `bold-${partKey++}`,
      });
    } else if (match[2]) {
      // Skill reference: {skillKey}
      const skillKey = match[2];
      if (skills[skillKey]) {
        parts.push({
          type: 'skill',
          skill: skills[skillKey],
          key: `skill-${partKey++}`,
        });
      }
    }

    currentIndex = regex.lastIndex;
  }

  // Add remaining text
  if (currentIndex < template.length) {
    parts.push({
      type: 'text',
      text: template.slice(currentIndex),
      key: `text-${partKey++}`,
    });
  }

  return parts;
}
