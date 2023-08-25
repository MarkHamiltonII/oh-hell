'use client';

export default function Frame({ bid, tricks }) {


    return (
        <>
            <tr>
                <td colSpan={3} className="frame-bid">{bid}</td>
                <td colSpan={3} className="frame-tricks">{tricks}</td>
            </tr>
            <tr>
                <td colSpan={6}>{getScore(bid,tricks)}</td>
            </tr>
        </>

    )
}

function getScore(bid, tricks) {
    if (isNaN(bid) || isNaN(tricks)) {
        return null
    }
    
    if (bid === tricks) {
        return bid + 10
    } 

    return tricks
}