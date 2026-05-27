type NextAuthConfig = Record<string, unknown>;

function createNotImplementedHandler() {
  return async () => new Response('NextAuth is not available in this workspace.', { status: 501 });
}

export default function NextAuth(_config: NextAuthConfig) {
  return {
    handlers: {
      GET: createNotImplementedHandler(),
      POST: createNotImplementedHandler(),
    },
    auth: async () => null,
    signIn: async () => null,
    signOut: async () => null,
  };
}
