export const TranslationKeys = {
  WELCOME_ABOUT: 'welcome-about',
  WELCOME_LOGIN: 'welcome-login',
  WELCOME_LOBBY: 'welcome-lobby',
  WELCOME_HEADING: 'welcome-heading',
  WELCOME_LANGUAGE: 'welcome-language',
  WELCOME_REGISTRATION: 'welcome-registration',
  WELCOME_DESCRIPTION: 'welcome-description',
} as const;

export type TranslationKey = (typeof TranslationKeys)[keyof typeof TranslationKeys];
