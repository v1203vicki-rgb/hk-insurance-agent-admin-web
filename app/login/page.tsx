"use client";

import Link from "next/link";
import { useState } from "react";
import { hasRemoteApiConfigured, login } from "../../lib/api";

export default function LoginPage() {
  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("password");
  const [message, setMessage] = useState(hasRemoteApiConfigured ? "等待登录" : "演示模式：未配置 API，可直接浏览后台页面");

  async function handleLogin() {
    if (!hasRemoteApiConfigured) {
      setMessage("演示模式：未配置 API，可直接进入平台后台或经纪公司后台。");
      return;
    }

    setMessage("正在登录...");
    try {
      const result = await login(email, password);
      setMessage(`登录成功：${result.user.role} / ${result.user.email}`);
    } catch {
      setMessage("登录失败，请确认 API 已启动。");
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: "420px minmax(0, 1fr)",
        background: "#eef3fb",
      }}
    >
      <section
        style={{
          background: "#111a2d",
          color: "#ffffff",
          padding: "42px 32px",
          display: "grid",
          alignContent: "space-between",
        }}
      >
        <div>
          <div style={{ fontSize: 30, fontWeight: 800 }}>HK Insurance AI</div>
          <div style={{ marginTop: 10, color: "#8fa1bf", fontSize: 18, lineHeight: 1.7 }}>平台管理后台与经纪公司后台</div>
        </div>
        <div style={{ color: "#8fa1bf", lineHeight: 1.8, fontSize: 15 }}>
          登录后可进入公共知识库、资料审核、Agent 规则、会话管理和数据看板。
        </div>
      </section>

      <section style={{ display: "grid", placeItems: "center", padding: 32 }}>
        <div
          style={{
            width: "100%",
            maxWidth: 440,
            background: "#ffffff",
            border: "1px solid #dbe5f2",
            borderRadius: 30,
            padding: 30,
            boxShadow: "0 18px 36px rgba(17, 29, 51, 0.06)",
          }}
        >
          <h1 style={{ margin: 0, fontSize: 36, color: "#15213a" }}>登录后台</h1>
          <p style={{ margin: "10px 0 0", color: "#6f809d", lineHeight: 1.8 }}>
            {hasRemoteApiConfigured ? "使用邮箱和密码登录；MVP 阶段以 JWT 登录态为主。" : "当前为分享演示模式，页面默认使用 mock 数据渲染。"}
          </p>

          <div style={{ display: "grid", gap: 14, marginTop: 28 }}>
            <label style={{ display: "grid", gap: 8 }}>
              <span style={{ color: "#6f809d", fontWeight: 600 }}>邮箱</span>
              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                style={{
                  padding: 14,
                  borderRadius: 18,
                  border: "1px solid #dbe5f2",
                  background: "#f7faff",
                  color: "#15213a",
                }}
              />
            </label>
            <label style={{ display: "grid", gap: 8 }}>
              <span style={{ color: "#6f809d", fontWeight: 600 }}>密码</span>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                style={{
                  padding: 14,
                  borderRadius: 18,
                  border: "1px solid #dbe5f2",
                  background: "#f7faff",
                  color: "#15213a",
                }}
              />
            </label>
            <button
              onClick={handleLogin}
              style={{
                height: 52,
                borderRadius: 18,
                background: "#111a2d",
                color: "white",
                border: 0,
                fontSize: 16,
                fontWeight: 700,
              }}
            >
              {hasRemoteApiConfigured ? "登录" : "进入演示模式"}
            </button>
            <div style={{ color: "#6f809d", fontSize: 13 }}>{message}</div>
          </div>

          {!hasRemoteApiConfigured ? (
            <div style={{ display: "flex", gap: 12, marginTop: 18, flexWrap: "wrap" }}>
              <Link
                href="/admin"
                style={{
                  minHeight: 46,
                  padding: "0 18px",
                  borderRadius: 16,
                  background: "#111a2d",
                  color: "#ffffff",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                }}
              >
                平台后台
              </Link>
              <Link
                href="/broker"
                style={{
                  minHeight: 46,
                  padding: "0 18px",
                  borderRadius: 16,
                  border: "1px solid #dbe5f2",
                  background: "#ffffff",
                  color: "#15213a",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                }}
              >
                经纪公司后台
              </Link>
            </div>
          ) : null}
        </div>
      </section>
    </main>
  );
}
