import { brandConfig } from '@/constants/brandConfig';

interface OpenAIMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface OpenAIResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
}

const SYSTEM_PROMPT = `Sei l'assistente virtuale di ${brandConfig.name}, una società con sede a Dubai specializzata nella gestione di crediti fiscali.

INFORMAZIONI AZIENDALI:
- Nome: ${brandConfig.name}
- Sede: Dubai, Emirati Arabi Uniti
- Servizi: Gestione crediti fiscali (Superbonus 110%, Bonus Edilizi, Industria 4.0, Crediti IVA, Crediti P.A.)
- Email: ${brandConfig.email}
- Telefono: ${brandConfig.phone}

SERVIZI PRINCIPALI:
1. Superbonus 110% - Detrazioni per efficientamento energetico e antisismico
2. Bonus Edilizi - Detrazioni 50-90% per ristrutturazioni ed ecobonus
3. Crediti Industria 4.0 - Crediti d'imposta 10-50% per investimenti tecnologici
4. Crediti IVA - Recupero e cessione crediti IVA maturati
5. Crediti P.A. - Crediti verso la Pubblica Amministrazione

PROCESSO:
1. Valutazione gratuita
2. Analisi tecnica della documentazione
3. Proposta commerciale
4. Gestione completa del processo

Rispondi sempre in italiano, sii professionale ma amichevole. Fornisci informazioni accurate sui nostri servizi e invita gli utenti a richiedere una valutazione gratuita quando appropriato.`;

export async function sendMessageToOpenAI(messages: OpenAIMessage[]): Promise<string> {
  const apiKey = process.env.EXPO_PUBLIC_OPENAI_API_KEY;
  
  if (!apiKey) {
    console.error('OpenAI API key not found');
    return 'Mi dispiace, il servizio di chat non è al momento disponibile. Puoi contattarci direttamente per assistenza.';
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...messages
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data: OpenAIResponse = await response.json();
    return data.choices[0]?.message?.content || 'Mi dispiace, non sono riuscito a elaborare la tua richiesta.';
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    return 'Mi dispiace, si è verificato un errore. Puoi contattarci direttamente per assistenza immediata.';
  }
}