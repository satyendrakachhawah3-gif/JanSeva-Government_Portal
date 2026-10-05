# JanSeva AI - Multi-Lingual Localization & i18n Guide

## Overview
This architectural guide outlines the multi-lingual localization framework used across the JanSeva AI Government Portal to support citizens in English, Hindi, and regional Indian languages.

---

## 1. Supported Languages

| Language | Code | Native Name | Status |
| :--- | :--- | :--- | :--- |
| **English** | `en` | English | Active Default |
| **Hindi** | `hi` | हिन्दी | Active Default |
| **Bengali** | `bn` | বাংলা | Planned Q4 |
| **Marathi** | `mr` | मराठी | Planned Q4 |
| **Tamil** | `ta` | தமிழ் | Planned Q4 |
| **Telugu** | `te` | తెలుగు | Planned Q4 |

---

## 2. i18n Dictionaries & Dynamic Voice Assistant
- JanSeva AI Chatbot Assistant processes voice and text queries in both Hindi and English.
- Translation dictionaries are located in `client/src/locales/{lang}.json`.
- Dynamic scheme details are fallback-translated using server-side natural language models.

---

## 3. Adding New Translations
To add dictionary entries for a new language, update `client/src/locales/`:
```json
{
  "welcome_title": "जनसेवा एआई पोर्टल में आपका स्वागत है",
  "apply_button": "योजना के लिए आवेदन करें",
  "track_status": "आवेदन की स्थिति जांचें"
}
```
