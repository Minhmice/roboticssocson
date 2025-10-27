import { Globe, Mail, Send } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-cyan-800/40 bg-black/40 backdrop-blur-md">
      <div className="container mx-auto px-4 py-12 md:px-6">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Column 1: Logo & Tagline */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Globe className="h-6 w-6 text-cyan-500" />
              <span className="text-xl font-bold text-slate-100">
                Robotics Sóc Sơn
              </span>
            </div>
            <p className="text-sm text-slate-400">
              Dynamic - Creative - Driven to Discover
            </p>
            <p className="mt-2 text-xs text-slate-500">
              Năng động - Sáng tạo - Không ngừng khám phá
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-400">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {[
                { label: "About", href: "/about" },
                { label: "Achievements", href: "/achievements" },
                { label: "Sponsorship", href: "/sponsorship" },
                { label: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-400 transition-colors hover:text-cyan-400"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Social & Contact */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-400">
              Contact
            </h4>
            <div className="space-y-3">
              <a
                href="mailto:{{SPONSOR_EMAIL}}"
                className="flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-cyan-400"
              >
                <Mail className="h-4 w-4" />
                {{SPONSOR_EMAIL}}
              </a>
              <a
                href="https://t.me/{{TELEGRAM_HANDLE}}"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-cyan-400"
              >
                <Send className="h-4 w-4" />
                @{{TELEGRAM_HANDLE}}
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-slate-800 pt-8 text-center text-xs text-slate-500">
          <p>© 2024 Robotics Sóc Sơn. All rights reserved.</p>
          <p className="mt-1">
            Developed with Next.js, Tailwind CSS, and shadcn/ui
          </p>
        </div>
      </div>
    </footer>
  );
};

/**
 * Usage example:
 * 
 * <Footer />
 */

