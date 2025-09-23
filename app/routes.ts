import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
	index("routes/home.tsx"),
	route("/checkin", "routes/checkin.tsx"),
	route("/timeline", "routes/timeline.tsx"),
	route("/knowledge", "routes/knowledge.tsx"),
	route("/knowledge/:slug", "routes/knowledge.$slug.tsx"),
] satisfies RouteConfig;
