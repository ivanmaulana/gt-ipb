// view banyak sepeda
CREATE VIEW jumlahSepeda AS SELECT
sum(case when sepedaLokasi = 1 then 1 else 0 end) shelter1,
sum(case when sepedaLokasi = 2 then 1 else 0 end) shelter2,
sum(case when sepedaLokasi = 3 then 1 else 0 end) shelter3,
sum(case when sepedaLokasi = 4 then 1 else 0 end) shelter4,
sum(case when sepedaLokasi = 5 then 1 else 0 end) shelter5,
sum(case when sepedaLokasi = 6 then 1 else 0 end) shelter6,
sum(case when sepedaLokasi = 7 then 1 else 0 end) shelter7,
sum(case when sepedaLokasi = 8 then 1 else 0 end) shelter8,
sum(case when sepedaLokasi = 9 then 1 else 0 end) shelter9,
sum(case when sepedaLokasi = 10 then 1 else 0 end) shelter10
from sepeda


// report peminjaman
CREATE VIEW reportPeminjaman AS SELECT pinjaman.mahasiswaNim, mahasiswa.mahasiswaNama, pinjaman.sepedaId, penjaga.penjagaNama, pinjaman.pinjamanWaktuPinjam, pinjaman.shelterIdPinjam, pinjaman.pinjamanWaktuKembali, pinjaman.shelterIdKembali FROM pinjaman, mahasiswa, penjaga WHERE pinjaman.mahasiswaNim = mahasiswa.mahasiswaNim AND pinjaman.penjagaIdPinjam = penjaga.penjagaId

// report shelter
SELECT sum(case when shelterIdPinjam = 1 then 1 else 0 end) shelter1
FROM pinjaman
WHERE pinjamanWaktuPinjam LIKE '2016-06-08%'


// draft
SELECT
sum(case when shelterIdPinjam = 1 then 1 else 0 end) shelter1Pinjam,
sum(case when shelterIdKembali = 1 then 1 else 0 end) shelter1Kembali,
sum(case when status = 0 then 1 else 0 end) belumKembali
FROM pinjaman
WHERE pinjamanWaktuPinjam LIKE '2016-06-08%'



// draft
SELECT
sum(case when shelterIdPinjam = 1 then 1 else 0 end) shelter1Pinjam,
sum(case when shelterIdKembali = 1 then 1 else 0 end) shelter1Kembali,
sum(case when shelterIdPinjam = 1 AND status = 0 then 1 else 0 end) shelter1BelumKembali,
"",

sum(case when shelterIdPinjam = 2 then 1 else 0 end) shelter2Pinjam,
sum(case when shelterIdKembali = 2 then 1 else 0 end) shelter2Kembali,
sum(case when shelterIdPinjam = 2 AND status = 0 then 1 else 0 end) shelter2BelumKembali,
"",

sum(case when shelterIdPinjam = 3 then 1 else 0 end) shelter3Pinjam,
sum(case when shelterIdKembali = 3 then 1 else 0 end) shelter3Kembali,
sum(case when shelterIdPinjam = 3 AND status = 0 then 1 else 0 end) shelter3BelumKembali,
"",

sum(case when shelterIdPinjam = 4 then 1 else 0 end) shelter4Pinjam,
sum(case when shelterIdKembali = 4 then 1 else 0 end) shelter4Kembali,
sum(case when shelterIdPinjam = 4 AND status = 0 then 1 else 0 end) shelter4BelumKembali,
"",

sum(case when shelterIdPinjam = 5 then 1 else 0 end) shelter5Pinjam,
sum(case when shelterIdKembali = 5 then 1 else 0 end) shelter5Kembali,
sum(case when shelterIdPinjam = 5 AND status = 0 then 1 else 0 end) shelter5BelumKembali,
"",

sum(case when shelterIdPinjam = 6 then 1 else 0 end) shelter6Pinjam,
sum(case when shelterIdKembali = 6 then 1 else 0 end) shelter6Kembali,
sum(case when shelterIdPinjam = 6 AND status = 0 then 1 else 0 end) shelter6BelumKembali,
"",

sum(case when shelterIdPinjam = 7 then 1 else 0 end) shelter7Pinjam,
sum(case when shelterIdKembali = 7 then 1 else 0 end) shelter7Kembali,
sum(case when shelterIdPinjam = 7 AND status = 0 then 1 else 0 end) shelter7BelumKembali,
"",

sum(case when shelterIdPinjam = 8 then 1 else 0 end) shelter8Pinjam,
sum(case when shelterIdKembali = 8 then 1 else 0 end) shelter8Kembali,
sum(case when shelterIdPinjam = 8 AND status = 0 then 1 else 0 end) shelter8BelumKembali,
"",

sum(case when shelterIdPinjam = 9 then 1 else 0 end) shelter9Pinjam,
sum(case when shelterIdKembali = 9 then 1 else 0 end) shelter9Kembali,
sum(case when shelterIdPinjam = 9 AND status = 0 then 1 else 0 end) shelter9BelumKembali,
"",

sum(case when shelterIdPinjam = 10 then 1 else 0 end) shelter10Pinjam,
sum(case when shelterIdKembali = 10 then 1 else 0 end) shelter10Kembali,
sum(case when shelterIdPinjam = 10 AND status = 0 then 1 else 0 end) shelter10BelumKembali

FROM pinjaman
WHERE pinjamanWaktuPinjam LIKE '2016-06-08%'
