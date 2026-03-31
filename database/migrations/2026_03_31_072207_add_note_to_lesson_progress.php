<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('lesson_progress', function (Blueprint $table) {
            $table->text('personal_note')->nullable()->after('completed_at');
        });
    }

    public function down()
    {
        Schema::table('lesson_progress', function (Blueprint $table) {
            $table->dropColumn('personal_note');
        });
    }
};