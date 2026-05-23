import type { ComponentType } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import type { SocialProfile } from "@/lib/teamSocialProfiles";

type SocialProfilePickerProps = {
  label: string;
  icon: ComponentType<{ className?: string; size?: number }>;
  profiles: SocialProfile[];
};

export function SocialProfilePicker({ label, icon: Icon, profiles }: SocialProfilePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label={`${label} — choose profile`}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-all duration-300 hover:scale-110 hover:bg-white hover:text-[#C8102E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
        >
          <Icon className="h-5 w-5" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        side="top"
        sideOffset={8}
        collisionPadding={16}
        className="w-52 max-w-[calc(100vw-2rem)] border-white/15 bg-[#9B0C23] p-2 text-white shadow-xl"
      >
        <p className="px-2 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white/55">
          {label}
        </p>
        <ul className="flex flex-col gap-0.5">
          {profiles.map((profile) => (
            <li key={`${label}-${profile.name}`}>
              <a
                href={profile.href}
                target={profile.href.startsWith("http") ? "_blank" : undefined}
                rel={profile.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="flex min-h-[44px] flex-col justify-center rounded-md px-2 py-2 text-left transition-colors hover:bg-white/10 focus-visible:bg-white/10 focus-visible:outline-none"
              >
                <span className="text-sm font-medium text-white">{profile.name}</span>
                {profile.detail && (
                  <span className="text-xs text-white/55">{profile.detail}</span>
                )}
              </a>
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
}
