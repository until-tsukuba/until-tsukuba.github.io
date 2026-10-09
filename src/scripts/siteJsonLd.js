// site.json の organization を schema.org の Organization に変換する
function toOrganization(org, baseUrl) {
  if (!org) {
    return undefined;
  }
  return {
    "@type": "Organization",
    name: org.name,
    alternateName: org.alternateName,
    url: org.url,
    logo: org.logo && new URL(org.logo, baseUrl).href,
    sameAs: org.accounts && Object.values(org.accounts).map(account => account.url),
    parentOrganization: toOrganization(org.parent, baseUrl)
  };
}

// トップページ用の JSON-LD（Organization と WebSite）を生成する
export default function(org) {
  const organizationId = new URL("#organization", org.url).href;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@id": organizationId,
        ...toOrganization(org, org.url)
      },
      {
        "@type": "WebSite",
        "@id": new URL("#website", org.url).href,
        name: org.name,
        alternateName: org.alternateName,
        url: org.url,
        inLanguage: "ja",
        publisher: { "@id": organizationId }
      }
    ]
  };
  // undefined のプロパティは JSON.stringify で除外される
  // "</script>" で script 要素が閉じないよう "<" をエスケープする
  return JSON.stringify(jsonLd).replace(/</g, "\\u003c");
}
