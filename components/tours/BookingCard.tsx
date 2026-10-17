"use client";

import { useState } from "react";
import Link from "next/link";
import { useT } from "next-i18next/client";
import { Users, Calendar, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createBooking, initPayment } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { useLocalizedHref } from "@/hooks/use-localized-href";
import { formatPrice } from "@/lib/utils";
import type { Booking } from "@/types";
import { showSuccess, showError } from "@/lib/toast";

interface BookingCardProps {
    tourId: string;
    price: number;
    currency: string;
    labels: {
        from: string;
        per_person: string;
        date: string;
        adults: string;
        children: string;
        book_now: string;
        booking: string;
        total: string;
        full_name: string;
        email: string;
        phone: string;
        success: string;
    };
    pricingOptionId?: string;
}

export function BookingCard({ tourId, price, currency, labels }: BookingCardProps) {
    const [date, setDate] = useState("");
    const [adults, setAdults] = useState(2);
    const [children, setChildren] = useState(0);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [booking, setBooking] = useState<Booking | null>(null);
    const [payingWith, setPayingWith] = useState<string | null>(null);
    const { user } = useAuth();
    const { t } = useT("tours");
    const withLocale = useLocalizedHref();

    const total = price * adults + price * 0.5 * children;

    async function handleBook(e: React.FormEvent) {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const created = await createBooking({
                tour_id: tourId,
                full_name: fullName,
                email,
                phone,
                tour_date: date,
                num_adults: adults,
                num_children: children,
            });
            showSuccess(labels.success);
            setBooking(created);
            setFullName("");
            setEmail("");
            setPhone("");
            setDate("");
        } catch (err) {
            showError(err instanceof Error ? err.message : "Xatolik yuz berdi");
        } finally {
            setIsSubmitting(false);
        }
    }

    async function handlePay(provider: "payme" | "click" | "stripe") {
        if (!booking) return;
        setPayingWith(provider);
        try {
            const res = await initPayment(booking.id, provider);
            window.location.assign(res.payment_url);
        } catch (err) {
            showError(err instanceof Error ? err.message : "Xatolik yuz berdi");
            setPayingWith(null);
        }
    }

    if (booking) {
        // Stripe odatda UZS bilan ishlamaydi: faqat USD/EUR buyurtmalarda taklif qilinadi
        const providers: Array<"payme" | "click" | "stripe"> = ["payme", "click"];
        if (["USD", "EUR"].includes(booking.currency.toUpperCase())) providers.push("stripe");

        return (
            <div className="sticky top-28 rounded-xl border border-border p-6 bg-card space-y-5">
                <div className="flex items-center gap-2 text-primary">
                    <CheckCircle2 className="h-5 w-5 text-mustard" />
                    <h3 className="font-bold text-xl">{t("booking_created")}</h3>
                </div>
                <div className="text-sm space-y-1">
                    <p className="text-muted-foreground">
                        {t("booking_number")}: <span className="font-semibold text-foreground">{booking.booking_number}</span>
                    </p>
                    <p className="text-muted-foreground">
                        {labels.total}:{" "}
                        <span className="font-semibold text-foreground">
                            {formatPrice(booking.total_price, booking.currency)}
                        </span>
                    </p>
                </div>

                {user ? (
                    <div className="space-y-2">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                            {t("pay_title")}
                        </p>
                        {providers.map((provider) => (
                            <Button
                                key={provider}
                                type="button"
                                disabled={payingWith !== null}
                                onClick={() => handlePay(provider)}
                                className="w-full rounded-lg uppercase tracking-wider gap-2"
                            >
                                {payingWith === provider && <Loader2 className="h-4 w-4 animate-spin" />}
                                {payingWith === provider ? t("pay_redirecting") : provider}
                            </Button>
                        ))}
                    </div>
                ) : (
                    <div className="space-y-3">
                        <p className="text-sm text-muted-foreground">{t("pay_login")}</p>
                        <Link
                            href={withLocale("/login")}
                            className="block w-full text-center bg-primary text-primary-foreground px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] hover:bg-accent hover:text-accent-foreground transition-colors"
                        >
                            {t("pay_login_btn")}
                        </Link>
                    </div>
                )}

                <button
                    type="button"
                    onClick={() => setBooking(null)}
                    className="link-underline text-xs text-muted-foreground cursor-pointer"
                >
                    {t("pay_later")}
                </button>
            </div>
        );
    }

    return (
        <div className="sticky top-28 rounded-xl border border-border p-6 bg-card">
            <div className="mb-5">
                <span className="text-xs text-muted-foreground">{labels.from}</span>
                <div className="flex items-baseline gap-1">
                    <span className="font-bold text-4xl text-primary">{formatPrice(price, currency)}</span>
                    <span className="text-sm text-muted-foreground">/ {labels.per_person}</span>
                </div>
            </div>

            <form onSubmit={handleBook} className="space-y-3">
                <Input
                    placeholder={labels.full_name}
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                />
                <Input
                    type="email"
                    placeholder={labels.email}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <Input
                    type="tel"
                    placeholder={labels.phone}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                />

                <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="pl-9"
                        required
                    />
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="text-xs text-muted-foreground flex items-center gap-1 mb-1.5">
                            <Users className="h-3.5 w-3.5" />
                            {labels.adults}
                        </label>
                        <Input
                            type="number"
                            min={1}
                            value={adults}
                            onFocus={(e) => e.target.select()}
                            onChange={(e) => setAdults(e.target.value === "" ? 0 : Number(e.target.value))}
                        />
                    </div>
                    <div>
                        <label className="text-xs text-muted-foreground block mb-1.5">{labels.children}</label>
                        <Input
                            type="number"
                            min={0}
                            value={children}
                            onFocus={(e) => e.target.select()}
                            onChange={(e) => setChildren(e.target.value === "" ? 0 : Number(e.target.value))}
                        />
                    </div>
                </div>

                <div className="flex items-center justify-between text-sm pt-2 border-t border-border">
                    <span className="text-muted-foreground">{labels.total}</span>
                    <span className="font-bold text-primary">
                        ≈ {formatPrice(total, currency)}
                    </span>
                </div>

                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-lg bg-accent text-accent-foreground hover:bg-accent/90 gap-2"
                >
                    {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
                    {isSubmitting ? labels.booking : labels.book_now}
                </Button>
            </form>
        </div>
    );
}