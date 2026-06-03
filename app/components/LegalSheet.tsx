"use client";

import { AnimatePresence, motion } from "framer-motion";

const COPY = {
  terms: {
    title: "תנאי שימוש",
    body: `דף נחיתה זה מופעל על ידי ENAV (ענב) לצורך גיוס מתעניינים בפרויקטים של החברה.
מילוי הטופס מהווה אישור לתנאים הבאים:
• הפרטים שתמסור/י ישמשו ליצירת קשר עם נציגי החברה ולשליחת עדכונים שיווקיים.
• ההזמנה לתור אינה מבטיחה את המועד עד לקבלת אישור טלפוני מנציג מכר.
• אין לעשות שימוש בדף זה למטרות אחרות מלבד הירשמות עצמית לסיור.
• החברה רשאית לעדכן תנאים אלה בכל עת ולפי שיקול דעתה.`,
  },
  privacy: {
    title: "מדיניות פרטיות",
    body: `המידע שנאסף (שם, טלפון, פרויקט מועדף, מועד הסיור) נשמר במאגרי ENAV ומשמש לצורכי שיווק וקשר עם לקוחות.
• לא נעביר את פרטיך לצדדים שלישיים ללא רשותך.
• ניתן להסיר עצמך בכל רגע באמצעות פנייה לטלפון *3989.
• המידע נשמר באמצעי אבטחה מקובלים.
• מדיניות זו כפופה לדין הישראלי.`,
  },
} as const;

export function LegalSheet({
  kind,
  onClose,
}: {
  kind: "terms" | "privacy" | null;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {kind && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 z-[70] bg-navy/75 backdrop-blur-sm"
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 bottom-0 z-[80] max-h-[80vh] overflow-y-auto border-t border-white/15 bg-navy px-5 pb-10 pt-6"
          >
            <div className="mx-auto max-w-[460px]">
              <div className="mb-5 flex items-center justify-between">
                <button
                  type="button"
                  onClick={onClose}
                  className="text-[13px] font-light text-white/55"
                >
                  סגירה
                </button>
                <h3 className="font-display text-[20px] font-extralight">
                  {COPY[kind].title}
                </h3>
              </div>
              <div className="mb-4 h-px w-full bg-white/10" />
              <p className="whitespace-pre-line text-right text-[13px] font-light leading-[1.75] text-white/70">
                {COPY[kind].body}
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
