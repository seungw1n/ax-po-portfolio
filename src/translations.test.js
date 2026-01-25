import { describe, it, expect } from 'vitest';
import { translations } from './data/translations';

describe('Translations', () => {
    const languages = ['KO', 'EN', 'CN', 'JP', 'ES'];

    it('should have keys for all supported languages', () => {
        languages.forEach(lang => {
            expect(translations).toHaveProperty(lang);
        });
    });

    it('should have consistent structure across languages', () => {
        const baseKeys = Object.keys(translations.KO);
        languages.forEach(lang => {
            expect(Object.keys(translations[lang])).toEqual(baseKeys);
        });
    });
});
