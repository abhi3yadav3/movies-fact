// lib/facts.ts
import 'server-only';
import OpenAI from 'openai';

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

function fallbackFact(movie: string) {
  // Rotating local facts so the page still changes on refresh
  const canned = [
    `The title "${movie}" has inspired tons of fan theories—none officially confirmed.`,
    `Many props in "${movie}" were repurposed from other productions to control budget.`,
    `A key scene in "${movie}" was nearly cut during test screenings.`,
    `Some dialogue in "${movie}" was improvised on set by the lead actor.`,
    `The marketing of "${movie}" used hidden clues (ARG-style) to tease fans.`,
  ];
  return canned[Math.floor(Math.random() * canned.length)];
}

export async function getFunFact(movie: string) {
  const prompt =
    `You are a film trivia expert. In ONE short sentence (≤30 words), give a fun, verifiable, non-spoiler fact about the movie "${movie}". Vary the fact each time.`;

  try {
    const res = await client.responses.create({
      model: 'gpt-4o-mini',
      input: prompt,
      temperature: 0.9,
    });
    const text = res.output_text?.trim();
    return text && text.length > 0 ? text : fallbackFact(movie);
  } catch (err: any) {
    // Gracefully degrade on quota/rate errors
    return fallbackFact(movie);
  }
}