"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState, type CSSProperties } from "react";
import { demoRoleCards, getDemoSession, getRoleHome, isValidEmail, loginDemo, saveDemoSession } from "../../lib/auth";
import { StatusBadge } from "../../components/status-badge";

export default function LoginPage() {
  const router = useRouter();
  const existingSession = useMemo(() => getDemoSession(), []);
  const [email, setEmail] = useState(existingSession?.email ?? "admin@example.com");
  const [password, setPassword] = useState("password");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit() {
    const nextError =
      email.trim().length === 0
        ? "邮箱不能为空"
        : password.trim().length === 0
          ? "密码不能为空"
          : !isValidEmail(email)
            ? "请输入正确的邮箱格式"
            : "";

    if (nextError) {
      setError(nextError);
      return;
    }

    setSubmitting(true);
    setError("");

    await new Promise((resolve) => setTimeout(resolve, 240));
    const result = loginDemo(email, password);

    if (!result.ok) {
      setSubmitting(false);
      setError(result.message);
      return;
    }

    saveDemoSession(result.session);
    router.replace(getRoleHome(result.session.role));
  }

  return (
    <main style={{ minHeight: "100vh", display: "grid", gridTemplateColumns: "minmax(320px, 460px) minmax(0, 1fr)", background: "#eef3fb" }}>
      <section style={{ background: "#111a2d", color: "#fff", padding: "42px 32px", display: "grid", alignContent: "space-between", gap: 24 }}>
        <div>
          <div style={{ fontSize: 30, fontWeight: 800 }}>HK Insurance AI</div>
          <div style={{ marginTop: 10, color: "#8fa1bf", fontSize: 18, lineHeight: 1.7 }}>香港保险知识问答 Agent MVP 演示版</div>
        </div>

        <div style={{ display: "grid", gap: 16 }}>
          <div style={{ padding: 18, borderRadius: 22, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <strong style={{ display: "block", marginBottom: 8 }}>演示模式说明</strong>
            <div style={{ color: "#b7c7df", fontSize: 14, lineHeight: 1.8 }}>
              当前为前端演示数据。
              <br />
              未连接真实 API。
              <br />
              可浏览权限、审核、知识库和会话流程。
            </div>
          </div>
          <div style={{ color: "#8fa1bf", lineHeight: 1.8, fontSize: 14 }}>
            登录后可以查看平台管理后台、经纪公司后台，以及包含引用来源、审核流程、产品对比与高风险提示的小程序端 Web 预览。
          </div>
        </div>
      </section>

      <section style={{ display: "grid", placeItems: "center", padding: 32 }}>
        <div style={{ width: "100%", maxWidth: 520, display: "grid", gap: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
            <div>
              <h1 style={{ margin: 0, fontSize: 34, color: "#15213a" }}>登录演示后台</h1>
              <p style={{ margin: "8px 0 0", color: "#6f809d", lineHeight: 1.8 }}>可直接选择演示角色，或使用预置账号登录。</p>
            </div>
            {existingSession ? <StatusBadge label={existingSession.role === "PLATFORM_ADMIN" ? "平台管理员" : existingSession.role === "BROKER_ADMIN" ? "经纪公司管理员" : "经纪人"} tone="info" /> : null}
          </div>

          <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(3, minmax(0, 1fr))" }}>
            {demoRoleCards.map((card) => (
              <button
                key={card.role}
                onClick={() => {
                  setEmail(card.email);
                  setPassword(card.password);
                  setError("");
                }}
                style={{
                  borderRadius: 20,
                  border: "1px solid #dbe5f2",
                  background: "#ffffff",
                  padding: 16,
                  cursor: "pointer",
                  textAlign: "left",
                  boxShadow: "0 12px 30px rgba(17, 29, 51, 0.04)",
                }}
              >
                <strong style={{ display: "block", color: "#15213a", marginBottom: 6 }}>{card.label}</strong>
                <span style={{ color: "#6f809d", fontSize: 12, lineHeight: 1.6 }}>{card.description}</span>
              </button>
            ))}
          </div>

          <div style={{ background: "#ffffff", border: "1px solid #dbe5f2", borderRadius: 30, padding: 28, boxShadow: "0 18px 36px rgba(17, 29, 51, 0.06)" }}>
            <div style={{ display: "grid", gap: 14 }}>
              <label style={{ display: "grid", gap: 8 }}>
                <span style={{ color: "#6f809d", fontWeight: 600 }}>邮箱</span>
                <input value={email} onChange={(event) => setEmail(event.target.value)} style={inputStyle} placeholder="请输入演示邮箱" />
              </label>
              <label style={{ display: "grid", gap: 8 }}>
                <span style={{ color: "#6f809d", fontWeight: 600 }}>密码</span>
                <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} style={inputStyle} placeholder="请输入演示密码" />
              </label>

              {error ? <div style={{ color: "#dc2626", fontSize: 13 }}>{error}</div> : <div style={{ color: "#6f809d", fontSize: 13 }}>默认演示密码均为 password</div>}

              <button onClick={handleSubmit} style={{ ...primaryButtonStyle, opacity: submitting ? 0.7 : 1 }} disabled={submitting}>
                {submitting ? "正在登录..." : "登录"}
              </button>
            </div>
          </div>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link href="/admin" style={secondaryLinkStyle}>
              进入平台后台
            </Link>
            <Link href="/broker" style={secondaryLinkStyle}>
              进入经纪公司后台
            </Link>
            <Link href="/mini/home" style={secondaryLinkStyle}>
              小程序端预览
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

const inputStyle: CSSProperties = {
  padding: 14,
  borderRadius: 18,
  border: "1px solid #dbe5f2",
  background: "#f7faff",
  color: "#15213a",
  outline: "none",
};

const primaryButtonStyle: CSSProperties = {
  height: 52,
  borderRadius: 18,
  background: "#111a2d",
  color: "white",
  border: 0,
  fontSize: 16,
  fontWeight: 700,
  cursor: "pointer",
};

const secondaryLinkStyle: CSSProperties = {
  minHeight: 44,
  padding: "0 16px",
  borderRadius: 16,
  border: "1px solid #dbe5f2",
  background: "#ffffff",
  color: "#15213a",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: 700,
};
