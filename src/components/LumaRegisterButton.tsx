"use client";

import React from "react";
import type { EventRegistration } from "@/lib/data/events";
import { isRegistrationClosed } from "@/lib/data/events";

interface LumaRegisterButtonProps {
  registration?: EventRegistration;
  /** Override the default button styling (e.g. for smaller card contexts). */
  className?: string;
}

const DEFAULT_BUTTON_CLASSES =
  "w-full inline-block bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 sm:py-4 rounded-lg shadow-lg transition-all duration-300 text-center text-base sm:text-lg tracking-wide ring-1 ring-blue-400/30 hover:ring-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transform hover:scale-105";

const CLOSED_BUTTON_CLASSES =
  "w-full inline-block bg-gray-700 text-gray-400 font-bold py-3 sm:py-4 rounded-lg text-center text-base sm:text-lg tracking-wide cursor-not-allowed select-none";

/**
 * Renders the registration entry point for an event:
 * - Nothing, if registration isn't enabled.
 * - "Registration Closed" (disabled), if registration.closesAt has passed.
 * - "Register Now", opening Luma's embedded checkout overlay when an
 *   eventId is configured, or acting as a clean redirect to the Luma event
 *   page otherwise (also the fallback if the embed script fails to load).
 */
const LumaRegisterButton: React.FC<LumaRegisterButtonProps> = ({ registration, className }) => {
  const eventId = registration?.eventId;

  if (!registration?.enabled) return null;

  if (isRegistrationClosed(registration)) {
    return (
      <button type="button" disabled className={className ?? CLOSED_BUTTON_CLASSES}>
        Registration Closed
      </button>
    );
  }

  // Registration is enabled but misconfigured (should already be caught by
  // event data validation) — fail quietly rather than rendering a dead link.
  if (registration.platform !== "luma" || !registration.url) return null;

  const buttonProps: Record<string, string> = eventId
    ? { "data-luma-action": "checkout", "data-luma-event-id": eventId }
    : {};

  return (
    <a
      href={registration.url}
      target="_blank"
      rel="noopener noreferrer"
      className={className ?? DEFAULT_BUTTON_CLASSES}
      style={{ boxShadow: "0 4px 24px 0 rgba(59,130,246,0.15)" }}
      {...buttonProps}
    >
      Register Now
    </a>
  );
};

export default LumaRegisterButton;
