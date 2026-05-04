const ProgressBar = () => {
    return (
        <div className="fixed left-0 top-0 z-50 h-1.5 w-full bg-black/12">
            <div
                className="progress-bar h-full bg-black"
                style={{ width: "0%" }}
            ></div>
        </div>
    );
};

export default ProgressBar;
