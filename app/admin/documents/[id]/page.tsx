import { DocumentDetailClient } from "../../../../components/document-detail-client";
import { getDocumentDetail, type DocumentDetail } from "../../../../lib/api";
import { documentDetails } from "../../../../lib/mock-data";

export default async function DocumentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let detail: DocumentDetail = documentDetails.doc_1;

  try {
    detail = await getDocumentDetail(id);
  } catch {
    // Fall back to local detail.
  }

  return <DocumentDetailClient initialDetail={detail} />;
}
