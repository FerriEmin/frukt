import { CollectionConfig } from "payload";

export const Partisipation: CollectionConfig = {
    slug: "partisipation",
    fields: [
        {
            name:"customer",
            label: "Customer",
            type: "relationship",
            relationTo: "customers",
            required: true,
        },
        {
            name: "course",
            label: "Course",
            type: "relationship",
            relationTo: "courses",
            required: true,
        },
        {
            name: "progress",
            label: "Progress",
            type: "number",
            required: true,
        }
    ]
}