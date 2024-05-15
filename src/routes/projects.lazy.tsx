import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/projects")({
    component: () => (
        <div className="p-8">
            <a href="https://russley.dev/json-schema-validator/#/">JSON Schema Validator</a>
        </div>
    ),
});
