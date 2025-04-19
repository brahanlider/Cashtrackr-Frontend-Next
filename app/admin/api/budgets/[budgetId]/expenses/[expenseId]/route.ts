import { verifySession } from "@/src/auth/dal";
import getToken from "@/src/auth/token";

//api/budgets/10/expenses/10
export async function GET(
  request: Request,
  { params }: { params: { budgetId: string; expenseId: string } }
) {
  await verifySession();

  const token = getToken();
  const url = `${process.env.API_URL}/budgets/${params.budgetId}/expenses/${params.expenseId}`;
  const req = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const reqData = await req.json();

  if (!req.ok) {
    //retornamos en string
    return Response.json(reqData.error, { status: 403 });
  }

  return Response.json(reqData);
}
