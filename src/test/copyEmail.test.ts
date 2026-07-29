import { describe, expect, it, vi } from "vitest";
import { copyTextOrMailto } from "../shared/copyText";

describe("copyTextOrMailto", () => {
  it("does not navigate when legacy copy succeeds after clipboard rejection", async () => {
    const navigate = vi.fn();
    const copied = await copyTextOrMailto("suoyff@gmail.com", {
      clipboard: { writeText: vi.fn().mockRejectedValue(new Error("denied")) },
      legacyCopy: vi.fn().mockReturnValue(true),
      navigate,
    });

    expect(copied).toBe(true);
    expect(navigate).not.toHaveBeenCalled();
  });

  it("navigates to mailto when clipboard and legacy copy both fail", async () => {
    const navigate = vi.fn();
    const copied = await copyTextOrMailto("suoyff@gmail.com", {
      clipboard: null,
      legacyCopy: vi.fn().mockReturnValue(false),
      navigate,
    });

    expect(copied).toBe(false);
    expect(navigate).toHaveBeenCalledWith("mailto:suoyff@gmail.com");
  });
});
