export type TransactionContract = {
    id: number; // equivalent to @NotNull and @Min(1)
    userId: number; // equivalent to @NotNull and @Min(1)
    type: "INCOME" | "EXPENSE"; // equivalent to @NotNull
    value: number; // equivalent to @NotNull and @Min(0)
    description: string; // equivalent to @NotEmpty and @Size(max = 255)
    categoryId: number; // equivalent to @NotNull and @Min(1)
    accountId: number; // equivalent to @NotNull and @Min(1)
    timestamp: string; // equivalent to @NotNull (OffsetDateTime in ISO format)
};
