import React, { useState } from "react";
import {Card} from "../../components/ui/Card";
import {Button} from "../../components/ui/Button";

const DUMMY_LIMITS = [
    { id: 1, type: "Per Transaction", limit: 10000 },
    { id: 2, type: "Daily", limit: 50000 },
    { id: 3, type: "Monthly", limit: 200000 },
];

export default function TransactionLimitsPage() {
    const [limits, setLimits] = useState(DUMMY_LIMITS);
    const [editing, setEditing] = useState(null);
    const [editValue, setEditValue] = useState("");

    const handleEdit = (row) => {
        setEditing(row.id);
        setEditValue(row.limit);
    };

    const handleSave = (id) => {
        setLimits((prev) =>
            prev.map((row) =>
                row.id === id ? { ...row, limit: Number(editValue) } : row
            )
        );
        setEditing(null);
        setEditValue("");
    };

    return (
        <Card title="Transaction Limits">
            <table style={{ width: "100%", marginBottom: 16 }}>
                <thead>
                <tr>
                    <th style={{ textAlign: "left", padding: 8 }}>Limit Type</th>
                    <th style={{ textAlign: "left", padding: 8 }}>Amount</th>
                    <th style={{ textAlign: "left", padding: 8 }}>Actions</th>
                </tr>
                </thead>
                <tbody>
                {limits.map((row) => (
                    <tr key={row.id}>
                        <td style={{ padding: 8 }}>{row.type}</td>
                        <td style={{ padding: 8 }}>
                            {editing === row.id ? (
                                <input
                                    type="number"
                                    value={editValue}
                                    onChange={(e) => setEditValue(e.target.value)}
                                    style={{ width: 100 }}
                                />
                            ) : (
                                row.limit
                            )}
                        </td>
                        <td style={{ padding: 8 }}>
                            {editing === row.id ? (
                                <>
                                    <Button size="sm" onClick={() => handleSave(row.id)}>
                                        Save
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="secondary"
                                        onClick={() => setEditing(null)}
                                        style={{ marginLeft: 8 }}
                                    >
                                        Cancel
                                    </Button>
                                </>
                            ) : (
                                <Button size="sm" onClick={() => handleEdit(row)}>
                                    Edit
                                </Button>
                            )}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </Card>
    );
}