import { Selector } from 'testcafe';

fixture`Testing user interface`
    .page`http://localhost:4200/student`;


test('Testing add students', async t => {
    await t.navigateTo("/addStudent");
    await t.typeText("#student-id", "123456");
    await t.typeText("#student-name", "Pasindu Basnayaka");
    await t.typeText("#student-age", "45");
    await t.typeText("#student-religion", "catholic");
    await t.click("#student-add");

    await t.navigateTo("/student");

    const table = Selector('#student-table')
    const rowCount = await table.find('tr').count;

    let tdText = await table.find('tr').nth(rowCount - 1).innerText;
    await t.expect(tdText).contains("Pasindu Basnayaka");
});

test('Testing delete students', async t => {
    await t.navigateTo("/addStudent");
    await t.typeText("#student-id", "222222");
    await t.typeText("#student-name", "Hiruni Gajanayake");
    await t.typeText("#student-age", "45");
    await t.typeText("#student-religion", "buddhist");
    await t.click("#student-add");

    await t.navigateTo("/student");

    await t.click("#student-delete-222222");

    const table = Selector('#student-table')
    const rowCount = await table.find('tr').count;

    let tdText = await table.find('tr').nth(rowCount - 1).innerText;
    await t.expect(tdText).notContains("Hiruni Gajanayake");
});

test('Testing edit students', async t => {
    await t.navigateTo("/addStudent");
    await t.typeText("#student-id", "222222");
    await t.typeText("#student-name", "Isuri De Silva");
    await t.typeText("#student-age", "27");
    await t.typeText("#student-religion", "buddhist");
    await t.click("#student-add");

    await t.navigateTo("/editStudent");
    await t.typeText("#student-name", "Isuri Sugathadasa");
    await t.typeText("#student-age", "28");
    await t.typeText("#student-religion", "catholic");
    await t.click("#student-edit");

    await t.navigateTo("/student");

    const table = Selector('#student-table')
    const rowCount = await table.find('tr').count;

    let tdText = await table.find('tr').nth(rowCount - 1).innerText;
    await t.expect(tdText).contains("Isuri Sugathadasa");
});