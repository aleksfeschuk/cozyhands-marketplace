import { useSearchParams } from "react-router-dom";

type Props = {
    total: number;
    perPage?: number;
};

export default function Pagination({ total, perPage = 12 }: Props) {
    const [sp, setSp] = useSearchParams();
    const page = Math.max(parseInt(sp.get("page") ?? "1", 10) || 1, 1);
    const last = Math.max(Math.ceil(total / perPage), 1);

    const go = (p: number) => {
        const next = new URLSearchParams(sp);
        next.set("page", String(Math.min(Math.max(1, p), last)));
        setSp(next, { replace: true });
    };

    if (last <= 1) return null;

    return (
        <div className="pagination">
            <button disabled={page <= 1} onClick={() => go(page - 1)}>Prev</button>
            <span className="pagination__meta">{page} / {last}</span>
            <button disabled={page >= last} onClick={() => go(page + 1)}>Next</button>
        </div>
    )
}