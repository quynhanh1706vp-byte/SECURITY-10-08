'use server';

import { getRequestConfig } from 'next-intl/server';
import { getUserLocale } from '@i18n';
import { readdir, readFile } from 'fs/promises';
import { join, relative } from 'path';

const loadMessages = async (locale: string) => {
  const defaultMessage = await import(`../../public/locales/${locale}/default.json`)
    .then((m) => m.default)
    .catch(() => ({}));

  const messages: Record<string, any> = {};
  const localePath = join(process.cwd(), 'public', 'locales', locale);

  const readFilesRecursively = async (dir: string) => {
    const entries = await readdir(dir, { withFileTypes: true });
    await Promise.all(
      entries.map(async (entry) => {
        const fullPath = join(dir, entry.name);
        if (entry.isDirectory()) {
          // Recursively read nested directories
          await readFilesRecursively(fullPath);
        } else if (entry.isFile() && entry.name.endsWith('.json') && entry.name !== 'default.json') {
          // Use path.relative for cross-platform compatibility
          const relativePath = relative(localePath, fullPath)
            .replace(/\.json$/, '')
            .replace(/\\/g, '/'); // Normalize to forward slashes;

          // Read JSON files and add them to messages
          const fileContent = await readFile(fullPath, 'utf-8');
          messages[relativePath] = JSON.parse(fileContent);
        }
      }),
    );
  };

  try {
    await readFilesRecursively(localePath);
  } catch (error) {
    console.error(`Error reading locale files for ${locale}:`, error);
  }

  return Object.assign(messages, defaultMessage);
};

export default getRequestConfig(async () => {
  const locale = await getUserLocale();
  const messages = await loadMessages(locale);
  return {
    locale,
    messages,
  };
});
