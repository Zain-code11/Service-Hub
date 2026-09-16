const ReviewCard = ({ review }) => {
  return (
    <div className="space-y-2 font-sans">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-bold text-slate-900">
          {review.customer?.name || "Verified Client"}
        </h4>
        <span className="text-xs text-slate-400">
          {review.createdAt && new Date(review.createdAt).toLocaleDateString()}
        </span>
      </div>

      <div className="text-amber-500 text-xs tracking-wider">
        {"⭐".repeat(review.rating)}
      </div>

      <p className="text-sm text-slate-600 leading-relaxed font-normal">
        {review.comment}
      </p>
    </div>
  );
};

export default ReviewCard;
