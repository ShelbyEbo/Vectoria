export default function GitHubProvider(options: Record<string, unknown>) {
  return {
    id: 'github',
    name: 'GitHub',
    type: 'oauth',
    options,
  };
}
