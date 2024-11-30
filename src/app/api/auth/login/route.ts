import prisma from "../../../../utils/prisma";
import { verifyPassword, generateToken } from "../../../../utils/auth";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return new Response(JSON.stringify({ error: "Invalid credentials" }), { status: 401 });

  const isValid = await verifyPassword(password, user.password);
  if (!isValid) return new Response(JSON.stringify({ error: "Invalid credentials" }), { status: 401 });

  const token = generateToken(user.id);
  return new Response(JSON.stringify({ token }), { status: 200 });
}
