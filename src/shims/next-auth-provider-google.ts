export default function GoogleProvider(options: Record<string, unknown>) {
  return {
    id: 'google',
    name: 'Google',
    type: 'oauth',
    options,
  };
}
