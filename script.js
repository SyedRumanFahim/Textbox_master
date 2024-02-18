$(document).ready(function() {
    function generateTextBoxWithCheckbox(serialNumber) {
        return `
        <div class="input-group mb-3">
            <div class="input-group-prepend">
                <div class="input-group-text">
                    <input type="checkbox" data-serial="${serialNumber}">
                </div>
            </div>
            <input type="text" class="form-control">
        </div>
        `;
    }

    $('button.btn').click(function() {
        var numTextBoxes = parseInt($('.formContainer input.form-control').val());
        if (isNaN(numTextBoxes) || numTextBoxes <= 0) {
            alert('Please enter a valid number of textboxes.');
            return;
        }

        var textBoxContainer = $('.textboxContainer');
        textBoxContainer.empty();
        for (var i = 1; i <= numTextBoxes; i++) {
            var textBoxMarkup = generateTextBoxWithCheckbox(i);
            textBoxContainer.append(textBoxMarkup);
        }
        $(".textboxDiv").show();
    });

    function calculateSumAndDisplay() {
        var sum = 0;
        var checkedPositions = [];
        count = 0;

        $('.textboxContainer input[type="checkbox"]:checked').each(function() {
            var serialNumber = parseInt($(this).data('serial'));
            checkedPositions.push(serialNumber);

            var inputValue = parseInt($(this).closest('.input-group').find('input[type="text"]').val());
            if (!isNaN(inputValue)) {
                sum += inputValue;
                count++;
            }
        });

        $('.resultOutput').html('Selected '+count+' Items,'+'There positions are: ' + checkedPositions.join(', ') + '<br> and Total number is: ' + sum);
    }

    $(document).on('change', '.textboxContainer input[type="checkbox"]', function() {
        calculateSumAndDisplay();
    });

    $('.allCheck').change(function() {
        var isChecked = $(this).prop('checked');
        $('.textboxContainer input[type="checkbox"]').prop('checked', isChecked);
        calculateSumAndDisplay();
    });
    $(document).on('change', '.textboxContainer input[type="checkbox"]', function() {
        var textBox = $(this).closest('.input-group').find('input[type="text"]');
        if ($(this).prop('checked') && textBox.val().trim() === '') {
            alert('Please enter a value in the textbox before checking the checkbox.');
            $(this).prop('checked', false);
        }
    });
});
