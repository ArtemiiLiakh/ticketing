interface ConfigSchema {
  STRIPE_PUBLIC: string;
}

const config: ConfigSchema = {
  STRIPE_PUBLIC: process.env.NEXT_PUBLIC_STRIPE_PUBLIC ?? '',
};

export default config;