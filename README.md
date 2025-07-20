# Creditly Global

App per la gestione di crediti fiscali con sede a Dubai.

## 🌐 Dominio
- **Produzione**: https://creditlyglobal.com
- **Sviluppo**: http://localhost:3000

## 🚀 Setup Dominio Personalizzato

1. **Configura le variabili d'ambiente:**
   ```bash
   cp .env.example .env
   ```

2. **Modifica il file `.env`:**
   ```
   EXPO_PUBLIC_RORK_API_BASE_URL=https://creditlyglobal.com
   EXPO_PUBLIC_APP_ENV=production
   EXPO_PUBLIC_OPENAI_API_KEY=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
   ```

3. **Verifica la configurazione:**
   - Avvia l'app: `npm start`
   - Testa l'endpoint: `https://creditlyglobal.com/api/config`

## 🤖 ChatBot AI

Il progetto include un chatbot AI integrato con OpenAI GPT-3.5-turbo:

- **Icona fluttuante**: In basso a destra su tutte le schermate
- **Conoscenza specializzata**: Informazioni sui servizi Creditly Global
- **Conversazioni intelligenti**: Risposte contestuali sui crediti fiscali
- **Supporto multipiattaforma**: Funziona su web e mobile

### Configurazione ChatBot:
1. Aggiungi la tua API key OpenAI nel file `.env`
2. Il chatbot è già configurato con informazioni aziendali
3. Supporta conversazioni fino a 10 messaggi di cronologia

## 🔧 Configurazione DNS

Assicurati che il tuo dominio punti correttamente al server:

- **Record A**: `creditlyglobal.com` → IP del server
- **Record CNAME**: `www.creditlyglobal.com` → `creditlyglobal.com`

## 🧪 Test di Connettività

```bash
# Testa l'API
curl https://creditlyglobal.com/api

# Testa la configurazione
curl https://creditlyglobal.com/api/config

# Verifica CORS
curl -H "Origin: https://creditlyglobal.com" \
     -H "Access-Control-Request-Method: POST" \
     -H "Access-Control-Request-Headers: X-Requested-With" \
     -X OPTIONS \
     https://creditlyglobal.com/api/trpc
```

## 📱 Funzionalità

- ✅ Gestione crediti fiscali (Superbonus, Bonus Edilizi, Industria 4.0)
- ✅ Dashboard utente e admin
- ✅ **ChatBot AI integrato con OpenAI**
- ✅ Sistema di upload documenti
- ✅ Pagamenti integrati
- ✅ FAQ e Privacy Policy
- ✅ Responsive design

## 🛠️ Deploy

1. Aggiorna le variabili d'ambiente sul server di produzione
2. Configura il DNS per puntare a creditlyglobal.com
3. Aggiungi la tua OpenAI API key
4. Riavvia l'applicazione
5. Verifica che CORS sia configurato correttamente

## 🔍 Troubleshooting

- Controlla che il dominio sia propagato: `nslookup creditlyglobal.com`
- Verifica i certificati SSL se usi HTTPS
- Controlla i log del server per errori CORS
- Testa l'API con curl per verificare la connettività
- **ChatBot**: Verifica che l'API key OpenAI sia valida e abbia crediti

## 📧 Supporto

Per supporto tecnico: info@creditlyglobal.com