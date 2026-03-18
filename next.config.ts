import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/**
 * 开发模式下从局域网 IP 打开站点时，浏览器 Origin 为 http://192.168.x.x:3000 等。
 * 若不声明 allowedDevOrigins，部分 Next 版本会对 /_next/* 跨源请求告警或拦截，导致手机/另一台电脑白屏。
 * 私网段 + .local（Bonjour）覆盖常见局域网场景；非常用网段可在 .env.local 里设 ALLOWED_DEV_ORIGINS。
 */
const privateLanOrigins = [
  "127.0.0.1",
  "192.168.*.*",
  "10.*.*.*",
  ...Array.from({ length: 16 }, (_, i) => `172.${16 + i}.*.*`),
  "*.local",
];
const extraDevOrigins =
  process.env.ALLOWED_DEV_ORIGINS?.split(/[\s,]+/).filter(Boolean) ?? [];

const nextConfig: NextConfig = {
  allowedDevOrigins: [...privateLanOrigins, ...extraDevOrigins],
};

export default withNextIntl(nextConfig);
