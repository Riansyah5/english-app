<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('study_items', function (Blueprint $table) {
            $table->string('level')->nullable()->after('type');
            $table->text('example_translation')->nullable()->after('example_sentence');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('study_items', function (Blueprint $table) {
            $table->dropColumn(['level', 'example_translation']);
        });
    }
};
