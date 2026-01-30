
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getSustainabilityTips = async (wasteType: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `بصفتك خبيراً في الاستدامة، قدم 3 نصائح عملية ومختصرة لجامعة أو مؤسسة حول كيفية تحسين عملية فرز وجمع نفايات من نوع "${wasteType}". اجعل الرد باللغة العربية بأسلوب مشجع.`,
    });
    return response.text || "لا يمكن الحصول على نصائح في الوقت الحالي.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "عذراً، حدث خطأ أثناء جلب النصائح البيئية.";
  }
};
