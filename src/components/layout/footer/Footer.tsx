import Link from "next/link";
import {
  Award,
  Globe,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  ShieldCheck,
  Truck,
} from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Grid } from "@/components/layout/Grid";
import { Stack } from "@/components/layout/Stack";
import { Divider } from "@/components/layout/Divider";
import { Logo } from "@/components/layout/header/Logo";
import { FooterNewsletter } from "@/components/layout/footer/FooterNewsletter";
import { siteConfig } from "@/config/site";
import { footerNav, legalNav } from "@/config/nav";

const socialIcons: Record<keyof typeof siteConfig.social, typeof Instagram> = {
  instagram: Instagram,
  pinterest: Globe,
  houzz: Globe,
  linkedin: Linkedin,
};

const trustBadges = [
  { icon: ShieldCheck, label: "10-year structural warranty" },
  { icon: Truck, label: "Nationwide professional installation" },
  { icon: Award, label: "Licensed & insured" },
] as const;

/**
 * Server Component — nothing here is interactive except `FooterNewsletter`
 * (its own client island), so the rest ships zero client JS.
 */
export function Footer() {
  return (
    <footer className="border-border bg-surface border-t">
      <Container size="content">
        <Section spacing="lg" className="pb-0">
          <Grid cols={1} gap="xl" className="lg:grid-cols-[1.3fr_repeat(5,1fr)]">
            <Stack gap="md" className="lg:pr-8">
              <Logo />
              <p className="text-body max-w-measure text-muted-foreground">
                {siteConfig.description}
              </p>
              <Stack gap="xs">
                <a
                  href={siteConfig.phoneHref}
                  className="text-body text-foreground duration-fast hover:text-primary flex items-center gap-2 transition-colors"
                >
                  <Phone className="size-4 shrink-0" aria-hidden="true" />
                  {siteConfig.phone}
                </a>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-body text-foreground duration-fast hover:text-primary flex items-center gap-2 transition-colors"
                >
                  <Mail className="size-4 shrink-0" aria-hidden="true" />
                  {siteConfig.email}
                </a>
              </Stack>
              <div className="flex gap-2 pt-1">
                {Object.entries(siteConfig.social).map(([platform, href]) => {
                  const Icon = socialIcons[platform as keyof typeof siteConfig.social];
                  return (
                    <a
                      key={platform}
                      href={href}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={platform}
                      className="border-border text-muted-foreground duration-fast hover:border-primary hover:text-primary flex size-9 items-center justify-center rounded-full border transition-colors"
                    >
                      <Icon className="size-4" aria-hidden="true" />
                    </a>
                  );
                })}
              </div>
            </Stack>

            {footerNav.map((column) => (
              <Stack gap="sm" as="nav" aria-label={column.title} key={column.title}>
                <p className="text-label text-muted-foreground">{column.title}</p>
                <Stack gap="xs" as="ul">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-body text-foreground/80 duration-fast hover:text-foreground transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </Stack>
              </Stack>
            ))}

            <Stack gap="sm">
              <p className="text-label text-muted-foreground">Stay in the loop</p>
              <FooterNewsletter />
            </Stack>
          </Grid>
        </Section>

        <Divider className="mt-12" />

        <div className="flex flex-col flex-wrap items-start gap-x-8 gap-y-4 py-8 sm:flex-row sm:items-center">
          {trustBadges.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="text-caption text-muted-foreground flex items-center gap-2"
            >
              <Icon className="text-primary size-4 shrink-0" aria-hidden="true" />
              {label}
            </div>
          ))}
        </div>

        <Divider />

        <div className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-caption text-muted-foreground">
            © {new Date().getFullYear()} {siteConfig.legalName}. All rights reserved.
          </p>
          <nav aria-label="Legal">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {legalNav.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-caption text-muted-foreground duration-fast hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Container>
    </footer>
  );
}
