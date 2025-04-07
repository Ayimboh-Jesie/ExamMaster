import React from "react";

const OneComment  = (comment) => {
    console.log("wanna see the structure of a comment here:", comment.commemt);
    return (
        <>
            <div className={`mt-6`}>
                <hr></hr>

                <div className={`flex gap-4 items-start mt-6`}>
                    <div className={`flex justify-center items-center rounded-full w-12 h-12 bg-gray-200`}>
                        <i className={`pi pi-user text-4xl text-white`}></i>
                    </div>

                    <div className={`flex flex-col gap-2`}>
                        <p className={`text-xl font-semibold`}>{comment?.commemt?.user?.name}</p>
                        <p className={`text-gray-500`}>{comment.commemt?.content}</p>
                    </div>

                </div>
            </div>
        </>
    )
}

export default OneComment
