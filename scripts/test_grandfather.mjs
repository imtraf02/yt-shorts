import fs from "node:fs";

const script = fs.readFileSync("scripts/grandfather_script.txt", "utf8").trim();
const scriptWords = script.match(/\S+/gu);

const SCENE_SCRIPTS = [
  `Nếu bạn quay ngược thời gian và khiến ông nội mình qua đời trước khi ông gặp bà, liệu bạn có còn tồn tại để thực hiện chuyến đi đó? Đây là nghịch lý khiến các nhà vật lý học đau đầu suốt gần một thế kỷ.`,
  `Nghịch lý ông nội là một trong những nghịch lý nổi tiếng nhất về du hành thời gian, lần đầu được nhà văn khoa học viễn tưởng René Barjavel mô tả trong tiểu thuyết năm 1943. Tình huống đặt ra rất đơn giản. Giả sử bạn có một cỗ máy thời gian, bạn quay ngược về quá khứ và khiến ông nội mình qua đời trước khi ông kịp gặp bà và sinh ra cha hoặc mẹ của bạn.`,
  `Nếu ông nội mất trước khi có con, cha hoặc mẹ bạn sẽ không bao giờ được sinh ra, và do đó, bạn cũng sẽ không tồn tại. Nhưng nếu bạn không tồn tại, thì làm sao bạn có thể quay ngược thời gian để khiến ông nội mình qua đời ngay từ đầu? Đây chính là vòng lặp nghịch lý, một hành động tự nó phủ định chính nguyên nhân dẫn đến nó.`,
  `Về bản chất, nghịch lý này chạm đến một trong những nguyên lý cốt lõi của vật lý học, tính nhân quả, tức là nguyên nhân luôn phải xảy ra trước kết quả. Du hành thời gian ngược, nếu có thể, sẽ phá vỡ hoàn toàn trật tự nhân quả này. Các nhà khoa học và triết học đã đưa ra nhiều cách lý giải khác nhau. Một hướng tiếp cận cho rằng nếu bạn thực sự quay về quá khứ, bạn sẽ không bao giờ có thể khiến ông nội mình qua đời được, vì một lý do bất khả kháng nào đó luôn ngăn cản hành động ấy xảy ra, súng bị kẹt đạn, bạn đổi ý vào phút chót, hoặc một sự kiện ngẫu nhiên can thiệp. Đây được gọi là nguyên lý tự nhất quán của Novikov, cho rằng lịch sử luôn tự bảo toàn tính logic của nó.`,
  `Một hướng giải thích khác đến từ cách diễn giải đa vũ trụ trong cơ học lượng tử. Theo giả thuyết này, khi bạn quay ngược thời gian và khiến ông nội qua đời, bạn không thay đổi lịch sử của chính vũ trụ mình đang sống, mà tạo ra một nhánh vũ trụ song song hoàn toàn mới. Trong vũ trụ gốc, bạn vẫn tồn tại bình thường. Trong vũ trụ mới, một phiên bản khác của bạn sẽ không bao giờ được sinh ra, nhưng điều đó không ảnh hưởng đến "bạn" ở vũ trụ ban đầu.`,
  `Cho đến nay, chưa ai chứng minh được du hành thời gian ngược là khả thi trong thực tế, nên nghịch lý này vẫn chỉ tồn tại trên lý thuyết. Nhưng chính vì chưa có lời giải cuối cùng, nó vẫn tiếp tục là một trong những câu đố hóc búa nhất của vật lý học hiện đại,`,
  `đủ sức truyền cảm hứng cho vô số bộ phim khoa học viễn tưởng từ Back to the Future cho đến nhiều tác phẩm khác. Đó là nghịch lý ông nội.`,
];

let allWords = [];
SCENE_SCRIPTS.forEach((text, i) => {
  const w = text.match(/\S+/gu);
  allWords.push(...w);
});

console.log("Script total:", scriptWords.length, "Scene total:", allWords.length);
let match = true;
for (let i = 0; i < scriptWords.length; i++) {
  if (scriptWords[i] !== allWords[i]) {
    console.log("Mismatch at", i, scriptWords[i], "vs", allWords[i]);
    match = false;
    break;
  }
}
console.log("Exact match:", match);
