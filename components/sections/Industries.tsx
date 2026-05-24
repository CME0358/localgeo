import { Card } from '@/components/ui/Card';
import { MotionItem, MotionStagger, SectionShell } from '@/components/ui/SectionShell';
import { defaultLanding } from '@/lib/content/default-landing';
import { cn } from '@/lib/utils';

const iconVariantStyles = {
  pink: 'bg-[#ff385c]/10 text-[#ff385c]',
  blue: 'bg-[#3b72ff]/10 text-[#3b72ff]',
  green: 'bg-[#00d48a]/10 text-[#00d48a]',
};

export function Industries() {
  const { services } = defaultLanding;

  return (
    <SectionShell
      className="bg-[#f8f9fc]"
      eyebrow={services.eyebrow}
      title={
        <>
          {services.titleLines[0]}
          <br />
          {services.titleLines[1]}
        </>
      }
    >
      <MotionStagger className="grid gap-6 md:grid-cols-3">
        {services.cards.map((card) => (
          <MotionItem key={card.name}>
            <Card variant="light" className="flex h-full flex-col p-6 md:p-7">
              <div
                className={cn(
                  'mb-4 flex h-12 w-12 items-center justify-center rounded-xl text-2xl',
                  iconVariantStyles[card.iconVariant],
                )}
              >
                {card.icon}
              </div>
              <h3 className="text-xl font-bold text-[#222222]">{card.name}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-[#6a6a6a]">
                {card.description}
              </p>
              <ul className="mt-5 space-y-2 border-t border-black/5 pt-5">
                {card.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 text-sm text-[#222222]"
                  >
                    <span className="mt-1 text-[#3b72ff]">•</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </Card>
          </MotionItem>
        ))}
      </MotionStagger>
    </SectionShell>
  );
}
