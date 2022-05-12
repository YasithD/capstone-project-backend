import { Selector } from 'testcafe';

fixture`Testing user interface`
    .page`http://localhost:4200/`;


test('Testing add teachers', async t => {
    await t.navigateTo("/addTeacher");
    await t.typeText("#teacher-id", "123456");
    await t.typeText("#teacher-name", "Mohan Perera");
    await t.typeText("#teacher-age", "45");
    await t.click("#teacher-add");

    await t.navigateTo("/");

    const table = Selector('#teacher-table')
    const rowCount = await table.find('tr').count;

    let tdText = await table.find('tr').nth(rowCount - 1).innerText;
    await t.expect(tdText).contains("Mohan Perera");
});

test('Testing delete teachers', async t => {
    await t.navigateTo("/addTeacher");
    await t.typeText("#teacher-id", "300000");
    await t.typeText("#teacher-name", "Hasitha Fernando");
    await t.typeText("#teacher-age", "45");
    await t.click("#teacher-add");

    await t.navigateTo("/");

    await t.click("#teacher-delete-300000");

    const table = Selector('#teacher-table')
    const rowCount = await table.find('tr').count;

    let tdText = await table.find('tr').nth(rowCount - 1).innerText;
    await t.expect(tdText).notContains("Hasitha Fernando");
});

test('Testing edit teachers', async t => {
    await t.navigateTo("/addTeacher");
    await t.typeText("#teacher-id", "320000");
    await t.typeText("#teacher-name", "Rashini Shehara");
    await t.typeText("#teacher-age", "45");
    await t.click("#teacher-add");

    await t.navigateTo("/editTeacher");
    await t.typeText("#teacher-name", "Rashini Basnayaka");
    await t.typeText("#teacher-age", "55");
    await t.click("#teacher-edit");

    await t.navigateTo("/");

    const table = Selector('#teacher-table')
    const rowCount = await table.find('tr').count;

    let tdText = await table.find('tr').nth(rowCount - 1).innerText;
    await t.expect(tdText).contains("Rashini Basnayaka");
});
