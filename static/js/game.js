/* สร้างแผนที่ */
const grid = document.getElementById('map_grid');//เริ่มต้นด้วยการเข้าถึงอีลิเมนต์ HTML ที่มี id เป็น 'map_grid' และเก็บไว้ในตัวแปร grid

for (let i = 0; i < 100; i++) { //วนลูป100 ครั้ง เพื่อสร้างช่อง(tile)100 ครั้ง
    const tile = document.createElement('div'); //สร้าง Eliment div ใหม่สำหรับแต่ล่ะช่อง
    tile.classList.add('tile'); //เพิ่มคลาส tileให้กับ div ที่สร้างขึ้น
    grid.appendChild(tile); // เพิ่ม div นี้เข้าไปใน grid
}

// กำหนดตำแหน่งของกำแพงใน grid [array]
const walls = [12, 13, 15, 16, 22, 26, 52,56, 62, 63,65,66];

// เพิ่มกำแพงใน grid
for (const wall of walls) { //วนลูปผ่านตำแหน่งกำแพงแต่ล่ะตำแหน่ง
    grid.children[wall].classList.add('wall'); //เพิ่มคลาส willให้กับช่องที่เป็นกำแพง
}

//ตำแหน่งอาวุธ
const weapons = [20,33,60];
for (const weapon of weapons) {
    grid.children[weapon].classList.add('weapon')
}

let weaponcount = 0;
const weaponClasses = ['player-weapon-purple', 'player-weapon-orange', 'player-weapon-cyan'];

function collectWeapon(position) {
    if (grid.children[position].classList.contains('weapon')) {
        // ลบ class 'weapon' ออกจากช่อง
        grid.children[position].classList.remove('weapon');

        // เพิ่ม class อาวุธให้กับตัวละคร
        const currentWeaponClass = weaponClasses[weaponcount % weaponClasses.length];
        grid.children[playerPosition].classList.remove('player-weapon-purple', 'player-weapon-orange', 'player-weapon-cyan');
        grid.children[playerPosition].classList.add(currentWeaponClass);
        weaponcount++;

        console.log(`Collected weapon! Total: ${weaponcount}`);
    }
}
function updateStatus() {
    console.log(`Player position: ${playerPosition}`);
    console.log(`Weapons collected: ${weaponcount}`);
    console.log(`Weapons left: ${document.querySelectorAll('.weapon').length}`);
}

/* ตำแหน่ง player */
/*ตำแหน่ง player*/
/**
 * let = ใช้ประกาศตัวแปร ไม่คงที่ เปลี่ยนแปลงได้ ในภายหลัง
 * const = ใช้ประกาศตัวแปร คงที่ ไม่สามารถเปลี่ยนแปลงได้
 */
let playerPosition = 44; //กำหนดตำแหน่งเริ่มต้นของplayer ที่ช่องที่44
/*ประกาศตัวแปร และ ตำแหน่งเริ่มต้น ของ player ในgrid */
const playerTile = grid.children[playerPosition]; /*เช้าถึง playerposition ในdiv 100 ช่อง และ จะเก็บการอ้างอิงไปที่ ช่องที่45 ใน กริด*/
playerTile.classList.add('player'); // เข้าถึงช่องนั้นและเพิ่มคลาส player ให้กับมัน และแสดงมัน


/**ติดตามการกดปุ่ม: e = even ที่เกิด เช่นกดปุ่ม*/
const keys = {}; /**ตัวแปรเก็บสถานะของคีย์ที่ถูกกด  || สร้างออบเจ็กต์ เพื่อเก็บสถาณะของปุ่มที่ถูกกด */

document.addEventListener('keydown', (e) => { //เพิ่ม event listener สำหรับ เหตุกรณ์ รับค่า จัดเก็บ กดปุ่ม **รับค่าปุ่มที่กด  = รับค่าของปุ่มที่ถูกกดจากอีเวนต์ออพเจ็กต์*/
    keys[e.code] = true; //บันทึกว่าปุ่มถูกกด (true)ในออบเจ็กต์ keys
    console.log(`Key down: ${e.code}`); //แสดงรหัสปุ่มที่ถูกกดใน คอนโซล

    //กำหนดตำแหน่งใหม่เริ่มต้นเท่ากับตำแหน่งปัจจุบัน
    let newPosition = playerPosition; /**สร้างตัวแปรใหม่ใช้สำหรับการคำนวณหรือจัดเก็บข้อมูลและ มีค่า้ริ่มต้นเท่ากับ player เดิม */
    const row = Math.floor(playerPosition / 10); 
    const col = playerPosition % 10;
/** คำนวณแถวและคอลัมน์ปัจจุบันของผู้เล่น*/

    console.log(`Keys pressed: ${JSON.stringify(keys)}`); //แสดงปุ่มทั้งหมดที่ถูกกดใน คอนโซลของเบราว์เซอร์

     /**ตรวจสอบการกดปุ่มและคำนวณตำแหน่งใหม่ตามทิศทางการเคลื่อนที่
      * รวมถึงการเคลื่อนที่แนวทแยงมุม
      */
    if ((keys['KeyW'] || keys['ArrowUp']) && (keys['KeyA'] || keys['ArrowLeft'])) { //บนซ้าย
        if (row > 0 && col > 0) newPosition -= 11;
    } else if ((keys['KeyW'] || keys['ArrowUp']) && (keys['KeyD'] || keys['ArrowRight'])) { // บนขวา
        if (row > 0 && col < 9) newPosition -= 9;
    } else if ((keys['KeyS'] || keys['ArrowDown']) && (keys['KeyA'] || keys['ArrowLeft'])) { // ล่างซ้าย
        if (row < 9 && col > 0) newPosition += 9;
    } else if ((keys['KeyS'] || keys['ArrowDown']) && (keys['KeyD'] || keys['ArrowRight'])) { // ล่างขวา
        if (row < 9 && col < 9) newPosition += 11;
    } else if (keys['KeyW'] || keys['ArrowUp']) { //บน
        if (row > 0) newPosition -= 10;
    } else if (keys['KeyS'] || keys['ArrowDown']) { //ล่าง 
        if (row < 9) newPosition += 10;
    } else if (keys['KeyA'] || keys['ArrowLeft']) { //ซ้าย
        if (col > 0) newPosition -= 1;
    } else if (keys['KeyD'] || keys['ArrowRight']) { //ขวา
        if (col < 9) newPosition += 1;
    }
    
    if (newPosition >= 0 && newPosition < 100 && !grid.children[newPosition].classList.contains('wall')) {
        /**ตรวจสอบตำแหน่งใหม่ว่า อยู่ในแผนที่ใหม และชนกำแพงรึเปล่า */
        grid.children[playerPosition].classList.remove('player');// ลบplayer ในตำแหน่งเก่า
        playerPosition = newPosition;// อัพเดต ตำแหน่ง
        grid.children[playerPosition].classList.add('player');// เพิ่มplayer ไปตำแหน่งใหม่
        collectWeapon(playerPosition);
        updateStatus();
        
    }

    // ตรวจสอบตำแหน่งใหม่ในคอนโซล และ แสดงข้อมูลเพิ่มเติมในคอนโซลเพื่อการตรวจสอบ
    console.log(`Row: ${row}, Col: ${col}`);
    console.log(`New Position: ${newPosition}`);
    console.log(`Is Wall: ${grid.children[newPosition].classList.contains('wall')}`);
});

document.addEventListener('keyup', (e) => { //เพิ่ม event listener สำหรับเหตุการณ์ปล่อยปุ่ม
    keys[e.code] = false; // บันทึกว่าปุ่มถูกปล่อย (false) ในออบเจ็กต์ keys
    console.log(`Key up: ${e.code}`); // แสดงรหัสปุ่มที่ถูกปล่อยในคอนโซล
});

