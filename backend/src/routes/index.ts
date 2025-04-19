import { IncomingMessage, ServerResponse } from "http";

const routes = (req: IncomingMessage, res: ServerResponse): void => {
  // Handle unknown routes
  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "Route not found" }));
};

export default routes;
