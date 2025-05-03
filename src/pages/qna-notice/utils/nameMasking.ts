export function nameMasking(name: string) {
  if (name.length === 2) {
    return name[0] + '*';
  }

  return name[0] + '*'.repeat(name.length - 2) + name[name.length - 1];
}
