const ProgressBar = () => {
    return (
        <div className="fixed top-0 left-0 w-full h-2 bg-gray-200 z-50">
            <div
                className="progress-bar h-full bg-blue-400"
                style={{ width: "0%" }}
            ></div>
        </div>
    );
};

export default ProgressBar;
